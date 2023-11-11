package com.backend.backendStockMatch.model;

import lombok.*;
import javax.persistence.*;
import java.util.UUID;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    private UUID id;

    private String username;
    private String email;
    private String password;
    private String currentStockView;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Preferences preferences;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Watchlist> watchlists;
}
