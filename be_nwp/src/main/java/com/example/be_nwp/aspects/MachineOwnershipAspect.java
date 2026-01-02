package com.example.be_nwp.aspects;

import com.example.be_nwp.model.Machine;
import com.example.be_nwp.services.MachineService;
import com.example.be_nwp.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class MachineOwnershipAspect {

    private final MachineService machineService;
    private final JwtUtil jwtUtil;
    private final HttpServletRequest request;

    public MachineOwnershipAspect(
            MachineService machineService,
            JwtUtil jwtUtil,
            HttpServletRequest request
    ) {
        this.machineService = machineService;
        this.jwtUtil = jwtUtil;
        this.request = request;
    }

    @Around("@annotation(com.example.be_nwp.annotations.OwnsMachine)")
    public Object checkOwnership(ProceedingJoinPoint joinPoint) throws Throwable {

        Claims claims = jwtUtil.parseToken(
                request.getHeader("Authorization").substring(7)
        );

        Long userId = claims.get("userId", Long.class);
        String role = claims.get("role", String.class);

        // ADMIN bypass
        if ("ADMIN".equals(role)) {
            return joinPoint.proceed();
        }

        // find machineId from arguments
        Long machineId = extractMachineId(joinPoint.getArgs());

        if (machineId == null) {
            throw new RuntimeException("Machine ID not found");
        }

        if (!machineService.isOwner(machineId, userId)) {
            throw new RuntimeException("Forbidden");
        }

        return joinPoint.proceed();
    }

    private Long extractMachineId(Object[] args) {
        for (Object arg : args) {
            if (arg instanceof Long) {
                return (Long) arg;
            }
            if (arg instanceof Machine machine) {
                return machine.getMachineId();
            }
        }
        return null;
    }
}
