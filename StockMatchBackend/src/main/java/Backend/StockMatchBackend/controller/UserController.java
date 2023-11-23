package Backend.StockMatchBackend.controller;

import Backend.StockMatchBackend.model.User;
import Backend.StockMatchBackend.repository.UserRepository;
import Backend.StockMatchBackend.services.UserService;
import Backend.StockMatchBackend.services.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    //testing purpose only we wont use this here
//    @PostMapping
//    public User createUser(@RequestBody User user) {
//        return userRepository.save(user);
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        User user = userService.processUserLogin(userDTO);
        return ResponseEntity.ok(user);
    }

}
