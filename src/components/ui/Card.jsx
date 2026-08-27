import React from 'react'

/**
 * Compound Component: Card
 * Chuẩn hóa các card blueprint với góc nét đứt (corner crosshairs) và hỗ trợ Header, Body, Footer
 */
export function Card({ className = '', corner = true, children, ...props }) {
  const cornerClass = corner ? 'dashed-box-corner' : ''
  return (
    <div className={`dashed-box ${cornerClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={`card-header ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

function CardBody({ className = '', children, ...props }) {
  return (
    <div className={`card-body ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ className = '', children, ...props }) {
  return (
    <div className={`card-footer ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
