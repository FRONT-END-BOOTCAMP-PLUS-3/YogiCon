import styled from 'styled-components';
import BackButton from '@/components/header/backButton';

const SubTitle = styled.div`
font-weight: 700;
font-size: 1.5625rem;
letter-spacing: -0.02rem;
text-align: center;
color: #FF5E5E;
`;

const MapHeader = () => {
    return(
    <div>
        <BackButton />
        <SubTitle>
            근처 매장 찾기
        </SubTitle>
    </div>
    )
}

export default MapHeader;