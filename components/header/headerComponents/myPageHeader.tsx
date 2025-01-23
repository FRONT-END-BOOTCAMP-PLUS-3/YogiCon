import styled from 'styled-components';

const SubTitle = styled.div`
font-weight: 700;
font-size: 1.5625rem;
letter-spacing: -0.02rem;
color: #FF5E5E;
`;

const MyPageHeader = () => {
    return(
    <div>
        <SubTitle>
            마이페이지
        </SubTitle>
    </div>
    )
}

export default MyPageHeader;