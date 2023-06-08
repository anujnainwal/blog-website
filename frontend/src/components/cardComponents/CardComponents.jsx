import { Card, Space } from 'antd'
import React from 'react'

const CardComponents = ({title,width,children,height}) => {
  return (
   
    <Space direction="vertical" size={16}>
    <Card
      title={title}
      style={{
        height: height ? `${height}vh`:'50vh',
        
        width: width? `${width}px`: '300px',
        boxShadow: '1px 3px 2px 4px rgba(46, 47, 62, 0.33)'
      }}
    >
{children}
    </Card>
    </Space>
   
  )
}

export default CardComponents