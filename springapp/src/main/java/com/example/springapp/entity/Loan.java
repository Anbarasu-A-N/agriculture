

package com.example.springapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Date;

@Entity
@Table(name = "loan")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String firstName;

    @NotBlank
    @Column(nullable = false)
    private String lastName;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date dateOfBirth;

    @NotBlank
    @Email
    @Column(nullable = false)
    private String emailId;

    @NotBlank
    @Column(nullable = false)
    private String aadharNo;

    @NotBlank
    @Column(nullable = false)
    private String address;

    @NotBlank
    @Pattern(regexp = "\\d{10}")
    @Column(nullable = false)
    private String phone;

    @NotBlank
    @Column(nullable = false)
    private String serviceType;

    @NotBlank
    @Column(nullable = false)
    private String farmSize;

    @NotBlank
    @Column(nullable = false)
    private String farmLocation;

    @Min(0)
    @Column(nullable = false)
    private int yearsInOperation;

    @NotBlank
    @Column(nullable = false)
    private String agriculturalExperience;

    @Positive
    @Column(nullable = false)
    private double loanAmountRequest;

    @NotBlank
    @Column(nullable = false)
    private String purposeOfLoan;

    @Min(300)
    @Max(850)
    @Column(nullable = false)
    private int creditScore;

    @Positive
    @Column(nullable = false)
    private double annualIncomeFromAgriculture;

    @Positive
    @Column(nullable = false)
    private double otherSourcesOfIncome;

    @NotBlank
    @Column(nullable = false)
    private String loanStatus;

    // Constructor with default values
    public Loan() {
        this.loanStatus = "Pending";
    }

    // Getters only, no setter methods

    // Other methods...

    @Override
    public String toString() {
        return "Loan [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", dateOfBirth=" + dateOfBirth
                + ", emailId=" + emailId + ", aadharNo=" + aadharNo + ", address=" + address + ", phone=" + phone
                + ", serviceType=" + serviceType + ", farmSize=" + farmSize + ", farmLocation=" + farmLocation
                + ", yearsInOperation=" + yearsInOperation + ", agriculturalExperience=" + agriculturalExperience
                + ", loanAmountRequest=" + loanAmountRequest + ", purposeOfLoan=" + purposeOfLoan + ", creditScore="
                + creditScore + ", annualIncomeFromAgriculture=" + annualIncomeFromAgriculture
                + ", otherSourcesOfIncome=" + otherSourcesOfIncome + ", loanStatus=" + loanStatus + "]";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getAadharNo() {
        return aadharNo;
    }

    public void setAadharNo(String aadharNo) {
        this.aadharNo = aadharNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getFarmSize() {
        return farmSize;
    }

    public void setFarmSize(String farmSize) {
        this.farmSize = farmSize;
    }

    public String getFarmLocation() {
        return farmLocation;
    }

    public void setFarmLocation(String farmLocation) {
        this.farmLocation = farmLocation;
    }

    public int getYearsInOperation() {
        return yearsInOperation;
    }

    public void setYearsInOperation(int yearsInOperation) {
        this.yearsInOperation = yearsInOperation;
    }

    public String getAgriculturalExperience() {
        return agriculturalExperience;
    }

    public void setAgriculturalExperience(String agriculturalExperience) {
        this.agriculturalExperience = agriculturalExperience;
    }

    public double getLoanAmountRequest() {
        return loanAmountRequest;
    }

    public void setLoanAmountRequest(double loanAmountRequest) {
        this.loanAmountRequest = loanAmountRequest;
    }

    public String getPurposeOfLoan() {
        return purposeOfLoan;
    }

    public void setPurposeOfLoan(String purposeOfLoan) {
        this.purposeOfLoan = purposeOfLoan;
    }

    public int getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(int creditScore) {
        this.creditScore = creditScore;
    }

    public double getAnnualIncomeFromAgriculture() {
        return annualIncomeFromAgriculture;
    }

    public void setAnnualIncomeFromAgriculture(double annualIncomeFromAgriculture) {
        this.annualIncomeFromAgriculture = annualIncomeFromAgriculture;
    }

    public double getOtherSourcesOfIncome() {
        return otherSourcesOfIncome;
    }

    public void setOtherSourcesOfIncome(double otherSourcesOfIncome) {
        this.otherSourcesOfIncome = otherSourcesOfIncome;
    }

    public String getLoanStatus() {
        return loanStatus;
    }

    public void setLoanStatus(String loanStatus) {
        this.loanStatus = loanStatus;
    }
}



/*
 
 */