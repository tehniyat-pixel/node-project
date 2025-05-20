// .adminjs/components/BarcodeImage.jsx
import React from 'react'

const BarcodeImage = (props) => {
  const { record } = props

  const url = record?.params?.barcodeImageUrl

  return (
    <div>
      {url ? (
        <img src={url} alt="Asset Barcode" style={{ maxWidth: '200px', height: 'auto' }} />
      ) : (
        <p>No barcode available</p>
      )}
    </div>
  )
}

export default BarcodeImage
