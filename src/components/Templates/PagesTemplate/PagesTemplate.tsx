import React, {FC, PropsWithChildren} from 'react';
import { Container, Grid, styled,useMediaQuery } from '@mui/material'
import './PagesTemplate.scss';

interface PagesProps {
    header?: any;
    children: any;
    footer?: any;
}

const PagesTemplate: FC<PropsWithChildren<PagesProps>> = ({
   header, children, footer
}) => {
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    return (
        <>
            <div className='header'>
                {header}
            </div>
            <Grid container columns={24}
                  sx={{
                      marginBottom:footer? {xs: '60px', sm: '60px', md: '80px', lg: '80px'}:'10px',
                  }}
            >
              {footer &&
                <Grid item xs={24} sm={24} md={3} lg={3} xl={2}>
                  <div className={matches ? 'footer-lg' :'footer'}>
                    {footer}
                  </div>
                </Grid>
              }
                <Grid item xs={24} sm={24} md={21} lg={footer ? 21 : 24} xl={footer ? 21 : 24}>
                    <Container maxWidth='xl'>
                        {children}
                    </Container>
                </Grid>

            </Grid>

        </>
    )
}

export default PagesTemplate
