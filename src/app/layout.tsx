import React, { type FC } from 'react'

import { Providers } from './providers'
import { MswWrapper } from './mswWrapper'

import './index.css'

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => <>
  <html lang="en">
    <body>
      <MswWrapper>
        <Providers>{children}</Providers>
      </MswWrapper>
    </body>
  </html>
</>

export default RootLayout
