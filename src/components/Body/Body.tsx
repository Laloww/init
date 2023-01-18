import React, { useMemo, useState } from 'react'
import styled from 'styled-components';

const Body = () => {

    return (
        <div>
            <RightLayout>
                <div>
                    <PlaceOrderLayout>
                        B
                    </PlaceOrderLayout>
                    <MyOedersLayout>
                        C
                    </MyOedersLayout>
                </div>
                <OrderBookLayout>
                    D
                </OrderBookLayout>
            </RightLayout>
        </div>
    )
}

const PlaceOrderLayout = styled.div`
  width: 900px;
  height: 460px;
  background: rgba(255,255,255, 0.7);
  border-radius: 16px;
`
const MyOedersLayout = styled.div`
  width: 900px;
  height: 405px;
  background: rgba(255,255,255, 0.7);
  border-radius: 16px;
  margin-top: 20px;
`

const OrderBookLayout = styled.div`
  width: 235px;
  height: 885px;
  background: rgba(255,255,255, 0.7);
  border-radius: 16px;
`

const RightLayout = styled.div`
  gap: 20px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`


export default Body
