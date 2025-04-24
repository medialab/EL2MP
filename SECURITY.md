# Security Policy

## Supported Versions

The following versions of the EL2MP website are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.1   | :white_check_mark: |

## Security Features

The EL2MP website implements several security measures to protect visitors:

1. **Content Security Policy (CSP)**: Restricts sources of executable scripts, styles, and other resources to prevent XSS attacks
2. **HTTP Security Headers**: Includes X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Strict-Transport-Security
3. **Cross-Origin Isolation**: Implements Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy headers
4. **Static Site Generation**: Uses SvelteKit with static adapter to reduce attack surface

## Vulnerability Reporting

If you discover a security vulnerability in the EL2MP website, please report it by emailing the project team (contact information to be added by repository owners).

**Please include the following information in your report:**

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggestions for remediation if available

We commit to acknowledging receipt of vulnerability reports within 48 hours and will provide an estimated timeline for a fix. 

## Security Update Process

The EL2MP team follows these steps when addressing security issues:

1. Confirm and assess the vulnerability
2. Develop and test a fix
3. Release the update
4. Disclose the vulnerability after users have had time to update

## Security Best Practices for Contributors

Contributors to the EL2MP project should:

1. Keep all dependencies updated to their latest secure versions
2. Follow SvelteKit security best practices
3. Avoid storing sensitive data in client-accessible code
4. Use the existing security headers and CSP directives
5. Test code changes thoroughly before submitting PRs

## Third-Party Services

The website uses Google Analytics for visitor tracking. Users concerned about privacy may want to use browser privacy extensions or features to limit tracking.

## Data Handling

The EL2MP website:
- Does not collect personal information beyond standard analytics
- Does not store user data server-side
- Uses local storage only for necessary website functionality

## Contact

For any questions regarding this security policy, please contact the EL2MP project team.
