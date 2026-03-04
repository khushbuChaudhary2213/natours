const React = require('react');

const styles = {
  wrapper: {
    padding: '20px',
  },
  button: {
    display: 'inline-block',
    padding: '12px 25px',
    backgroundColor: '#55c57a',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
};

function Welcome({ firstName, url }) {
  // console.log('welcome mail');
  return (
    <div style={styles.wrapper}>
      <p>Hi {firstName},</p>

      <p>Welcome to Natours, we're glad to have you 🎉🙏</p>

      <p>
        We're all a big family here, so make sure to upload your user photo so
        we get to know you a bit better!
      </p>

      <p>
        <a href={url} style={styles.button}>
          Upload user photo
        </a>
      </p>

      <p>
        If you need any help with booking your next tour, please don't hesitate
        to contact me!
      </p>

      <p>- Khushbu Chaudhary, CEO</p>
    </div>
  );
}

module.exports = Welcome;
