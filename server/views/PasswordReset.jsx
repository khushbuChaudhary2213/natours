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
  link: {
    color: 'black',
    textDecoration: 'none',
    wordBreak: 'break-all', // most reliable in emails
    overflowWrap: 'break-word',
    display: 'block',
  },
};

function PasswordReset({ firstName, url }) {
  // console.log('Password reset mail');
  return (
    <div style={styles.wrapper}>
      <p>Hi {firstName},</p>

      <p>
        Forgot your password? Submit the PATCH request with your new password
        and passwordConfirm to:
        <p>
          <span style={styles.link}>{url}</span>
        </p>
      </p>

      <p>Website for this action not yet implemented!</p>

      <p>
        <a href={url} style={styles.button}>
          Reset Your Password
        </a>
      </p>

      <p>
        If you need any help with booking your next tour, please don't hesitate
        to contact me!
      </p>
    </div>
  );
}

module.exports = PasswordReset;
