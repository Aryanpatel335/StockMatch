package Backend.StockMatchBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@SpringBootApplication
public class StockMatchBackendApplication {

	static {
		try {
			// Replace with the path to your .env file
			List<String> lines = Files.readAllLines(Paths.get(".env"));
			for (String line : lines) {
				String[] parts = line.split("=", 2);
				if (parts.length == 2) {
					String key = parts[0];
					String value = parts[1];
					System.setProperty(key, value);
				}
			}
		} catch (IOException e) {
			throw new RuntimeException("Failed to load .env file", e);
		}
	}


	public static void main(String[] args) {
		SpringApplication.run(StockMatchBackendApplication.class, args);
	}

}
