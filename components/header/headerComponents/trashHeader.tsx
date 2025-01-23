import styled from 'styled-components';
import BackButton from '@/components/header/backButton';

const SubTitle = styled.div`
font-weight: 700;
font-size: 1.5625rem;
letter-spacing: -0.02px;
text-align: center;
color: #FF5E5E;
`;

const TrashHeader = () => {
    return(
    <div>
        <BackButton />
        <SubTitle>
            휴지통
        </SubTitle>
    </div>
    )
}

export default TrashHeader;