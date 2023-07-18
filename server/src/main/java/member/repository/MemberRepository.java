package member.repository;

import member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;





    public interface MemberRepository extends JpaRepository<Member, Long> {


    }

