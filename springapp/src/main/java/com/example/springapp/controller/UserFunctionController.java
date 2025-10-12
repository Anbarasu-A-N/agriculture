package com.example.springapp.controller;


import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Path;
// import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.core.io.Resource;
//import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.example.springapp.entity.ChangePasswordRequest;
import com.example.springapp.entity.Contact;
import com.example.springapp.entity.Loan;
import com.example.springapp.entity.Review;
import com.example.springapp.entity.Users;
import com.example.springapp.repository.ContactRepository;
import com.example.springapp.repository.LoanRepository;
import com.example.springapp.repository.ReviewRepository;
import com.example.springapp.repository.UserFunctionRepository;
import com.example.springapp.service.LoanService;
import com.example.springapp.service.ReviewService;
import com.example.springapp.service.UserFunctionService;
import org.springframework.beans.factory.annotation.Value;
import jakarta.annotation.PostConstruct;

import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.IOUtils;


@CrossOrigin
@RestController
@RequestMapping("/userfunction")
public class UserFunctionController {

    @Autowired
    @Qualifier("userFunctionServiceImpl")
    private UserFunctionService userFunctionService;

    @Autowired
    private UserFunctionRepository userFunctionRepository;

    @GetMapping("/adminGetDetails")
    public List<Users> getAllUsers() {
        return userFunctionService.getDetails();
    }

    
    @GetMapping("/profile")
    public ResponseEntity<Users> getProfile(@RequestParam String emailId) {
        try {
        	Users userFunction = userFunctionService.getUserByEmailId(emailId);
            if (userFunction != null) {
                return ResponseEntity.status(HttpStatus.OK).body(userFunction);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Autowired
    private AmazonS3 amazonS3;
    
    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Value("${aws.s3.folder}")
    private String folderName;

    
    @PostConstruct
    public void validateConfig() {
        if (!StringUtils.hasText(bucketName)) {
            throw new IllegalStateException("AWS S3 bucket name is not configured");
        }
        if (!StringUtils.hasText(folderName)) {
            throw new IllegalStateException("AWS S3 folder name is not configured");
        }
    }

    @GetMapping("/getImage/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
        try {
            // Include folder prefix in the S3 object key
            String objectKey = folderName + "/" + imageName;
            S3Object s3Object = amazonS3.getObject(new GetObjectRequest(bucketName, objectKey));
            byte[] imageBytes = IOUtils.toByteArray(s3Object.getObjectContent());

            HttpHeaders headers = new HttpHeaders();
            //headers.setContentType(MediaType.IMAGE_JPEG); // Adjust based on file extension if needed
            String extension = imageName.substring(imageName.lastIndexOf(".") + 1).toLowerCase();
            MediaType mediaType = switch (extension) {
                case "png" -> MediaType.IMAGE_PNG;
                case "gif" -> MediaType.IMAGE_GIF;
                default -> MediaType.IMAGE_JPEG;
            };
            headers.setContentType(mediaType);
            headers.setContentLength(imageBytes.length);

            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{userId}/uploadImage")
    public ResponseEntity<String> uploadImage(@PathVariable Integer userId, @RequestParam MultipartFile file) {
        try {
            Users userFunction = userFunctionRepository.findById(userId).orElse(null);

            if (userFunction == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            String uniqueFileName = userId + "_" + System.currentTimeMillis() + "_" + fileName;

            // Include folder prefix in the S3 object key
            String objectKey = folderName + "/" + uniqueFileName;

            // Upload file to S3
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());
            
            amazonS3.putObject(bucketName, objectKey, file.getInputStream(), metadata);

            // Update the user's profileImagePath with the file name (without folder prefix)
            userFunction.setProfileImagePath(uniqueFileName);
            userFunctionRepository.save(userFunction);

            return ResponseEntity.ok("Image uploaded successfully!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error.");
        }
    }


    /*

    // This is For Local Image Retrieval
    @GetMapping("/getImage/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        try {
            // Resolve the file path for the requested image
            Path imagePath = Path.of(uploadPath).resolve(imageName);
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                // Set content type dynamically based on image type
                MediaType mediaType = MediaType.IMAGE_JPEG; // You may need to determine the media type based on file extension
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(mediaType);

                return new ResponseEntity<>(resource, headers, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
   

    
    

    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping("/{userId}/uploadImage")
    public ResponseEntity<String> uploadImage(@PathVariable Integer userId, @RequestParam MultipartFile file) {
        try {
        	Users userFunction = userFunctionRepository.findById(userId).orElse(null);

            if (userFunction == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            // Validate the image file if needed (e.g., file size, file type, etc.)
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            // Generate a unique file name to avoid overwriting existing files
            String uniqueFileName = userId + "_" + System.currentTimeMillis() + "_" + fileName;

            // Save the file to the server
            Path directoryPath = Path.of(uploadPath);
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

            Path filePath = directoryPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Update the user's profileImagePath with the file path
            userFunction.setProfileImagePath(uniqueFileName);
            userFunctionRepository.save(userFunction);

            return ResponseEntity.ok("Image uploaded successfully!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error.");
        }
    }

    */

 


    @Autowired
    private JavaMailSender javaMailSender;

    
    
    private String generateOtp() {
        // Generate a 6-digit random OTP
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    private void sendOtpEmail(String emailId, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailId);
        message.setSubject("OTP for Password Reset");
        message.setText("Dear Customer,\r\n"
                + "\r\n"
                + "Thank you for using our services! To complete your authentication process, please use the following One-Time Password (OTP).\r\n"
                + "\r\n"
                + "Your OTP for password reset is:[ " + otp + " ]\r\n"
                + "\r\n"
                + "This OTP is valid for a single use only. Please do not share this OTP with anyone for security reasons.\r\n"
                + "If you did not request this OTP, please contact our support team immediately at support email: allsmart.org@gmail.com.\r\n"
                + "\r\n"
                + "Thank you for your attention to this matter.\r\n"
                + "\r\n"
                + "Best regards,\r\n"
                + "\r\n"
                + "Allsmart\r\n"
                + "Customer Support Team\r\n"
                + "allsmart.org@gmail.com"
        		+ "");

        javaMailSender.send(message);
    }

    @PostMapping("/sendOtp")
    public ResponseEntity<String> sendOtp(@RequestParam String emailId) {
        Users user = userFunctionService.findByEmailId(emailId);

        if (user != null) {
            // Generate OTP
            String otp = generateOtp();
            user.setOtp(otp);
            userFunctionService.userFunction(user);

            // Send OTP via email
            sendOtpEmail(user.getEmailId(), otp);

            return new ResponseEntity<>("OTP sent successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }


    
    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    @PostMapping("/verifyOtpAndUpdatePassword")
    public ResponseEntity<String> verifyOtpAndUpdatePassword(
            @RequestParam String emailId,
            @RequestParam String otp,
            @RequestParam String newPassword) {
        // Validate password strength
        if (newPassword.length() < 8) {
            return new ResponseEntity<>("Password must be at least 8 characters long", HttpStatus.BAD_REQUEST);
        }
        if (!newPassword.matches(".*[!@#$%^&*(),.?\":{}|<>].*")) {
            return new ResponseEntity<>("Password must include at least one special character", HttpStatus.BAD_REQUEST);
        }

        Users user = userFunctionService.findByEmailId(emailId);
        if (user != null && user.getOtp() != null && user.getOtp().equals(otp)) {
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setOtp(null);
            userFunctionService.userFunction(user);
            System.out.println("Password updated for user: " + emailId);
            return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
        } else {
            System.out.println("OTP verification failed for email: " + emailId);
            return new ResponseEntity<>("Invalid OTP or user not found", HttpStatus.BAD_REQUEST);
        }
    }


    

    

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        String emailId = request.getEmailId();
        String oldPassword = request.getOldPassword();
        String newPassword = request.getNewPassword();

        try {
            // Retrieve the user from the database using the emailId
            Users user = userFunctionRepository.findByEmailId(emailId);

            if (user == null) {
                // User not found
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            // Verify the old password
            boolean isOldPasswordCorrect = passwordEncoder.matches(oldPassword, user.getPassword());

            if (!isOldPasswordCorrect) {
                // Old password doesn't match
                return new ResponseEntity<>("Incorrect old password", HttpStatus.UNAUTHORIZED);
            }

            // Check if old password is equal to new password
            if (oldPassword.equals(newPassword)) {
                return new ResponseEntity<>("New password must be different from the old password", HttpStatus.BAD_REQUEST);
            }

            // Encrypt the new password before saving
            String encodedNewPassword = passwordEncoder.encode(newPassword);

            // Update the user's password with the new encoded one
            user.setPassword(encodedNewPassword);
            userFunctionRepository.save(user);

            return new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to change password. Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /* 

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(String emailId, String password) {
        try {
            Users userFunction = userFunctionRepository.findByEmailId(emailId);

            if (userFunction != null && passwordEncoder.matches(password, userFunction.getPassword())) {
                // Finally, delete the user
                userFunctionRepository.delete(userFunction);
                return ResponseEntity.ok("User deleted successfully");
            } else {
                return ResponseEntity.badRequest().body("Invalid credentials");
            }
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            // Return a generic error message to the client
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }


    */

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private ContactRepository contactRepository;

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(String emailId, String password) {
        try {
            Users userFunction = userFunctionRepository.findByEmailId(emailId);

            if (userFunction != null && passwordEncoder.matches(password, userFunction.getPassword())) {
                System.out.println("Password matched for user: " + emailId);
                // Check and delete associated loans
                List<Loan> userLoans = loanRepository.findByEmailId(emailId);
                for (Loan loan : userLoans) {
                    // Check loan status
                    if ("Finished".equalsIgnoreCase(loan.getLoanStatus()) || loan.getLoanStatus() == null) {
                        // Delete associated reviews
                        List<Review> loanReviews = reviewRepository.findByEmailId(emailId);
                        reviewRepository.deleteAll(loanReviews);

                        // Delete associated contacts
                        List<Contact> loanContacts = contactRepository.findByEmailId(emailId);
                        contactRepository.deleteAll(loanContacts);

                        // Finally, delete the loan
                        loanRepository.delete(loan);
                    } else {
                        return ResponseEntity.badRequest().body("Loan is not finished");
                    }
                }

                // Finally, delete the user
                userFunctionRepository.delete(userFunction);

                return ResponseEntity.ok("User deleted successfully");
            } else {
                System.out.println("Invalid credentials for user: " + emailId);
                return ResponseEntity.badRequest().body("Invalid credentials");
            }
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            // Return a generic error message to the client
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }




    private LoanService loanService;

    private ReviewService reviewService;

    //@Autowired // Inject the dependencies via constructor
    public UserFunctionController(LoanService loanService, ReviewService reviewService) {
        this.loanService = loanService;
        this.reviewService = reviewService;
    }

    

    @PutMapping("/updateDetailsByEmail/{oldEmailId}")
    public ResponseEntity<String> updateUserDetails(@PathVariable String oldEmailId, @RequestBody Users updatedUser) {
        String newEmailId = updatedUser.getEmailId();
        
        // Check if the new emailId is different from the old one
        if (!oldEmailId.equals(newEmailId)) {
            // Check if the new emailId already exists
            if (userFunctionService.isEmailIdExists(newEmailId)) {
                return new ResponseEntity<>("EmailId already in use by another user", HttpStatus.BAD_REQUEST);
            }

            // Update emailId in other tables
            updateEmailIdInOtherTables(oldEmailId, newEmailId);
        }

        Users existingUser = userFunctionService.findByEmailId(oldEmailId);

        if (existingUser != null) {
            // Update other user details
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setGender(updatedUser.getGender());
            existingUser.setAge(updatedUser.getAge());
            existingUser.setEmailId(newEmailId); // Update to the new emailId
            existingUser.setMobile(updatedUser.getMobile());

            // Save the updated user details
            userFunctionService.userFunction(existingUser);

            return new ResponseEntity<>("User details updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    // Method to update emailId in other tables
    private void updateEmailIdInOtherTables(String oldEmailId, String newEmailId) {
        // Update emailId in Loan table
        List<Loan> loans = loanService.findByEmailId(oldEmailId);
        for (Loan loan : loans) {
            loan.setEmailId(newEmailId);
            loanService.save(loan); // Assuming you have a method `save` in LoanService
        }

        // Update emailId in Review table
        List<Review> reviews = reviewService.findByEmailId(oldEmailId);
        for (Review review : reviews) {
            review.setEmailId(newEmailId);
            reviewService.addReview(review); // Assuming you have a method `addReview` in ReviewService
        }

        // Add similar logic for other related tables
    }
    
    

}




