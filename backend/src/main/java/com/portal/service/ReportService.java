package com.portal.service;

import com.portal.model.Report;
import com.portal.model.User;
import com.portal.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {
    
    @Autowired
    private ReportRepository reportRepository;

    public Report saveReport(Report report) {
        return reportRepository.save(report);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAllOrderByReportDateDesc();
    }

    public List<Report> getReportsByUser(String username) {
        return reportRepository.findAllByCitizenUsername(username);
    }

    public List<Report> getReportsByStatus(String status) {
        return reportRepository.findByStatus(status);
    }

    public List<Report> getReportsByThreatLevel(String threatLevel) {
        return reportRepository.findByThreatLevel(threatLevel);
    }

    public Optional<Report> getReportById(Long id) {
        return reportRepository.findById(id);
    }

    public Report updateReportStatus(Long id, String status) {
        Optional<Report> reportOpt = reportRepository.findById(id);
        if (reportOpt.isPresent()) {
            Report report = reportOpt.get();
            report.setStatus(status);
            return reportRepository.save(report);
        }
        return null;
    }

    public long getReportCountByStatus(String status) {
        return reportRepository.countByStatus(status);
    }

    public Report createReport(String suspiciousAppName, String victimName, String contactInfo,
                              String downloadSource, String threatLevel, String description,
                              String evidenceFileName, User citizen) {
        Report report = new Report(suspiciousAppName, victimName, contactInfo, downloadSource,
                                 threatLevel, description, evidenceFileName, citizen);
        return saveReport(report);
    }
}