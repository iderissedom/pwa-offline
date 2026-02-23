package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZonedDateTime;

@RestController
@RequestMapping("/api/cached")
public class CachedController {

    private record CachedData(String name, ZonedDateTime createdAt) {}

    @GetMapping
    public CachedData getCachedData() {
        return new CachedData("iderisse",  ZonedDateTime.now());
    }
}
