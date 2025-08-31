package com.portal.controller;

import com.portal.model.Report;
import com.portal.model.User;
import com.portal.service.ReportService;
import com.portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private UserService userService;

    private static final String UPLOAD_DIR = "uploads/";

    // Citizen endpoints
    @PostMapping("/citizen/reports")
    public ResponseEntity<?> submitReport(@RequestBody Map<String, String> reportData, 
                                        Authentication authentication) {
        try {
            User citizen = userService.findByUsername(authentication.getName()).orElse(null);
            if (citizen == null) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User not found"));
            }

            Report report = reportService.createReport(
                reportData.get("suspiciousAppName"),
                reportData.get("victimName"),
                reportData.get("contactInfo"),
                reportData.get("downloadSource"),
                reportData.get("threatLevel"),
                reportData.get("description"),
                reportData.get("evidenceFileName"),
                citizen
            );

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Report submitted successfully",
                "reportId", report.getId()
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Failed to submit report"));
        }
    }

    @GetMapping("/citizen/reports")
    public ResponseEntity<List<Report>> getCitizenReports(Authentication authentication) {
        List<Report> reports = reportService.getReportsByUser(authentication.getName());
        return ResponseEntity.ok(reports);
    }

    @PostMapping("/citizen/upload")
    public ResponseEntity<?> uploadEvidence(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "File is empty"));
            }

            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Save file
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "File uploaded successfully",
                "fileName", fileName
            ));

        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Failed to upload file"));
        }
    }

    // Police endpoints
    @GetMapping("/police/reports")
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/police/reports/{id}")
    public ResponseEntity<?> getReportById(@PathVariable Long id) {
        Optional<Report> report = reportService.getReportById(id);
        if (report.isPresent()) {
            return ResponseEntity.ok(report.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/police/reports/{id}/status")
    public ResponseEntity<?> updateReportStatus(@PathVariable Long id, @RequestBody Map<String, String> statusData) {
        try {
            String status = statusData.get("status");
            Report updatedReport = reportService.updateReportStatus(id, status);
            
            if (updatedReport != null) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Report status updated successfully"
                ));
            }
            
            return ResponseEntity.notFound().build();

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Failed to update status"));
        }
    }

    @GetMapping("/police/stats")
    public ResponseEntity<?> getReportStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", reportService.getAllReports().size());
        stats.put("pending", reportService.getReportCountByStatus("pending"));
        stats.put("investigating", reportService.getReportCountByStatus("investigating"));
        stats.put("resolved", reportService.getReportCountByStatus("resolved"));
        
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/police/reports/status/{status}")
    public ResponseEntity<List<Report>> getReportsByStatus(@PathVariable String status) {
        List<Report> reports = reportService.getReportsByStatus(status);
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/police/reports/threat/{threatLevel}")
    public ResponseEntity<List<Report>> getReportsByThreatLevel(@PathVariable String threatLevel) {
        List<Report> reports = reportService.getReportsByThreatLevel(threatLevel);
        return ResponseEntity.ok(reports);
    }
}