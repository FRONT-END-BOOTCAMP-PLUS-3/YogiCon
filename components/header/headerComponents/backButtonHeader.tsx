import styled from 'styled-components';
import BackButton from '../backButton';
import { usePathname } from 'next/navigation';

const SubTitle = styled.div`
font-weight: 700;
font-size: 1.5625rem;
letter-spacing: -0.02rem;
color: #FF5E5E;
text-align: center;
`;

const BackButtonHeader = () => {
    const pathname = usePathname();
    const headerComponents: { [key: string]: string } = {
        '/map': "근처 매장 찾기",
        '/trash': "휴지통",
        '/get-giftcon': "기프티콘 등록",
        '/giftcon-detail': "기프티콘 상세",
    };
    const headerText = headerComponents[pathname];

    return(
    <div>
        <BackButton />
        <SubTitle>
            {headerText}
        </SubTitle>
    </div>
    )
}

export default BackButtonHeader;