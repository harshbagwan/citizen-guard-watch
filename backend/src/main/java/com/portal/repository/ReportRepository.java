package com.portal.repository;

import com.portal.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findAllByCitizenUsername(String username);
    List<Report> findByStatus(String status);
    List<Report> findByThreatLevel(String threatLevel);
    
    @Query("SELECT COUNT(r) FROM Report r WHERE r.status = :status")
    long countByStatus(@Param("status") String status);
    
    @Query("SELECT r FROM Report r ORDER BY r.reportDate DESC")
    List<Report> findAllOrderByReportDateDesc();
}