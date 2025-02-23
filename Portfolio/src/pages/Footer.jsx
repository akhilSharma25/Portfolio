import React from 'react'

const Footer = () => {
  return (
    <>

       {/* footer section  */}
       <footer className="footer">
  <div className="container grid grid-two-cols">
    <div className="footer-content">
      <p> &copy; 2025 Akhil Sharma. All Rights Reserved.</p>
    </div>
    <div className="social-links">
      <a href="https://www.linkedin.com/in/akhil-sharma-61224024a/" target="_blank" rel="noopener noreferrer">
        <img src="linkedin-icon.png" alt="LinkedIn" />
      </a>
      <a href="https://github.com/akhilSharma25" target="_blank" rel="noopener noreferrer">
        <img src="github-icon.png" alt="GitHub" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <img src="twitter-icon.png" alt="Twitter" />
      </a>
    </div>
  </div>
</footer>
    </>
  )
}

export default Footer