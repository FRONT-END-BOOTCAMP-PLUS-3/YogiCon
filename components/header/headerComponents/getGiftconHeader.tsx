import styled from 'styled-components';
import BackButton from '../backButton';

const SubTitle = styled.div`
font-weight: 700;
font-size: 1.5625rem;
letter-spacing: -0.02rem;
color: #FF5E5E;
text-align: center;
`;

const GetGiftconHeader = () => {
    return(
    <div>
        <BackButton />
        <SubTitle>
            기프트콘 등록
        </SubTitle>
    </div>
    )
}

export default GetGiftconHeader;