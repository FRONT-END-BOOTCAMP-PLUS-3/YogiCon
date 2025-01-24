import styled from 'styled-components';
import BackButton from '../backButton';
import { usePathname } from 'next/navigation';

const SubTitle = styled.h1`
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 700;
    font-size: 1.5625rem;
    letter-spacing: -0.02rem;
    color: var(--main);
    text-align: center;
    height: 3.375rem;
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

    return (
        <div>
            <BackButton />
            <SubTitle>
                {headerText}
            </SubTitle>
        </div>
    )
}

export default BackButtonHeader;