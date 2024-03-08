import {
    Container,
    StyledList,
    StyledLink,
    StyledTitle,
} from './styles/Footer.styled';

const Footer = () => {
    return (
        <Container>
            <StyledTitle>Links</StyledTitle>
            <StyledList>
                <StyledLink href='https://github.com/Alqossab-A' target='_blank' rel='noopener noreferrer'>
                    <i className='fa fa-github fa-lg' aria-hidden='true'>
                        {' '}
                        GitHub
                    </i>
                </StyledLink>
                <StyledLink href='https://linkedin.com/in/ahmed-al-qossab-0a6a10230' target='_blank'>
                    <i className='fa fa-linkedin-square fa-lg' aria-hidden='true'>
                        {' '}
                        LinkedIn
                    </i>
                </StyledLink>
                <StyledLink href='https://instagram.com/leeg0go' target='_blank' rel='noopener noreferrer'>
                    <i className='fa fa-instagram fa-lg' aria-hidden='true'>
                        {' '}
                        Instagram
                    </i>
                </StyledLink>
            </StyledList>
        </Container>
    );
};

export default Footer;
