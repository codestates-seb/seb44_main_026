package greenNare.member.mapper;

import greenNare.member.entity.Member;
import greenNare.member.dto.MemberDto;
import org.mapstruct.Mapper;

import java.util.List;

    @Mapper(componentModel = "spring")
    public interface MemberMapper {
        Member memberPostToMember(MemberDto.Post requestBody);

        Member memberPatchToMember(MemberDto.Patch requestBody);

        MemberDto.Response memberToMemberResponse(Member member);



    }
