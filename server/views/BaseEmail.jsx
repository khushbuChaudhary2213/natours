const React = require('react');
const Welcome = require('./Welcome');
const PasswordReset = require('./PasswordReset');

const styles = {
  body: {
    backgroundColor: '#f6f6f6',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    lineHeight: '1.4',
    margin: 0,
    padding: 0,
  },
  container: {
    maxWidth: '580px',
    margin: '0 auto',
    padding: '10px',
  },
  main: {
    background: '#ffffff',
    borderRadius: '3px',
    width: '100%',
  },

  footer: {
    textAlign: 'center',
    color: '#999999',
    fontSize: '12px',
    marginTop: '10px',
  },
};

function BaseEmail({ subject, firstName, url }) {
  // console.log(subject);
  return (
    <html>
      <body style={styles.body}>
        <div style={styles.container}>
          <div style={styles.main}>
            {subject === 'passwordReset' ? (
              <PasswordReset firstName={firstName} url={url} />
            ) : (
              <Welcome firstName={firstName} url={url} />
            )}
          </div>
          <div style={styles.footer}>
            <p>Natours Inc, 123 Nowhere Road, San Francisco CA 99999</p>
            <p>
              Don’t like these emails? <a href="#">Unsubscribe</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}

module.exports = BaseEmail;
