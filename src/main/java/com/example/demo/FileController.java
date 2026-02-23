package com.example.demo;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/file")
public class FileController {
    @GetMapping
    public FileSystemResource getFile() throws IOException {
        var file = new ClassPathResource("test.txt").getFile();
        return new FileSystemResource(file);
    }
}
