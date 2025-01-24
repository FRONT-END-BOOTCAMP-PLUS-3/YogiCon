import styled from 'styled-components';

const Logo = styled.div`
    font-size: 1.375rem;
    color: #FF5E5E;
    font-weight: 800;
    font-family: 'Caprasimo', sans-serif;

`;

const HomeHeader = () => {
    return (
        <div>
            <link
                href="https://fonts.googleapis.com/css2?family=Caprasimo&display=swap"
                rel="stylesheet"
            />
            <Logo>YOGICON</Logo>
        </div>
    );
};

export default HomeHeader;
