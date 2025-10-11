

package com.example.springapp.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rid")
    private int reviewId;
    
    @Column(name = "First_name", nullable = false)
    private String firstName;

    @Column(name = "Last_name", nullable = false)
    private String lastName;

    @Column(name = "emailId", nullable = false)
	@NotBlank(message = "EmailId cannot be blank")
    private String emailId;
    
    @Column(name = "review", nullable = false , length = 10000)
    private String review;
    
    @Column(name = "Review_score", nullable = true)
    private int reviewScore;

    public int getReviewId() {
		return reviewId;
	}

	public void setReviewId(int reviewId) {
		this.reviewId = reviewId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public int getReviewScore() {
		return reviewScore;
	}

	public void setReviewScore(int reviewScore) {
		this.reviewScore = reviewScore;
	}

	public Review(int reviewId, String firstName, String lastName,
			@NotBlank(message = "EmailId cannot be blank") String emailId, String review, int reviewScore) {
		this.reviewId = reviewId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.review = review;
		this.reviewScore = reviewScore;
	}

	public Review() {
	}

	

    
}


/*
 * 
 */