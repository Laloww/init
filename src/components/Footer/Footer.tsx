import React, { useMemo, useState } from 'react'
import styled from 'styled-components';
import logo from '../../assets/images/logo.png'
import instagram from '../../assets/images/instagram.png'
import facebook from '../../assets/images/facebook.png'
import twiter from '../../assets/images/twiter.png'
import youtube from '../../assets/images/youtube.png'

const Footer = () => {

    return (
        <FooterStyled>
            <ListPolicy>
                <div>Privacy Policy</div>
                <div>Terms & Conditions</div>
                <div>Cookie Policy</div>
            </ListPolicy>
            <LogoStyled src={logo} />
            <SocialIcon>
                <img src={facebook} />
                <img src={twiter} />
                <img src={youtube} />
                <img src={instagram} />
            </SocialIcon>
        </FooterStyled>
    )
}
const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`
const ListPolicy = styled.div`
  font-family: 'Manrope';
  color: #676767;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const LogoStyled = styled.img`
  width: 150px;
  height: 25px;
`

const FooterStyled = styled.footer`
  margin-top: 36px;
  box-sizing: border-box;
  border-top: 1px solid #CDD2DD;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 220px;
  border-bottom: 1px solid #CDD2DD;
  border-radius: 3px;
  padding: 0.5rem 0;
  width: 100%;
  background: #F0F5F5;
  padding: 50px 70px 91px 70px;
  
`

export default Footer
