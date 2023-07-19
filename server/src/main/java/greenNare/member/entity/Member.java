package greenNare.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;
    @Column(nullable = false, updatable = false, unique = true)
    private String email;
    @Column(length = 100, nullable = false)
    private String password;
    @Column(length = 100, nullable = false)
    private String name;
    @Column(nullable = false)
    private int point;


    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

   }








