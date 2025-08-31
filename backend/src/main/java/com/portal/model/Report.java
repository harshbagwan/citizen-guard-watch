package com.portal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
public class Report {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Suspicious app name is required")
    private String suspiciousAppName;

    @NotBlank(message = "Victim name is required")
    private String victimName;

    @Email(message = "Valid email is required")
    private String contactInfo;

    @NotBlank(message = "Download source is required")
    private String downloadSource;

    @NotBlank(message = "Threat level is required")
    private String threatLevel;

    @Column(length = 65535, columnDefinition = "TEXT")
    @NotBlank(message = "Description is required")
    private String description;

    private String evidenceFileName;
    
    private String status = "pending"; // pending, investigating, resolved

    @NotNull
    private LocalDateTime reportDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "citizen_id")
    private User citizen;

    // Default constructor
    public Report() {
        this.reportDate = LocalDateTime.now();
    }

    // Constructor
    public Report(String suspiciousAppName, String victimName, String contactInfo, 
                  String downloadSource, String threatLevel, String description, 
                  String evidenceFileName, User citizen) {
        this.suspiciousAppName = suspiciousAppName;
        this.victimName = victimName;
        this.contactInfo = contactInfo;
        this.downloadSource = downloadSource;
        this.threatLevel = threatLevel;
        this.description = description;
        this.evidenceFileName = evidenceFileName;
        this.citizen = citizen;
        this.reportDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSuspiciousAppName() {
        return suspiciousAppName;
    }

    public void setSuspiciousAppName(String suspiciousAppName) {
        this.suspiciousAppName = suspiciousAppName;
    }

    public String getVictimName() {
        return victimName;
    }

    public void setVictimName(String victimName) {
        this.victimName = victimName;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public String getDownloadSource() {
        return downloadSource;
    }

    public void setDownloadSource(String downloadSource) {
        this.downloadSource = downloadSource;
    }

    public String getThreatLevel() {
        return threatLevel;
    }

    public void setThreatLevel(String threatLevel) {
        this.threatLevel = threatLevel;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEvidenceFileName() {
        return evidenceFileName;
    }

    public void setEvidenceFileName(String evidenceFileName) {
        this.evidenceFileName = evidenceFileName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDateTime reportDate) {
        this.reportDate = reportDate;
    }

    public User getCitizen() {
        return citizen;
    }

    public void setCitizen(User citizen) {
        this.citizen = citizen;
    }
}