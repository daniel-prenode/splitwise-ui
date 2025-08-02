#!/bin/bash

# Update German XLIFF file with translations
sed -i '' 's/<source>Welcome Back<\/source>/<source>Welcome Back<\/source>\n        <target>Willkommen zurück<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Sign in to your account<\/source>/<source>Sign in to your account<\/source>\n        <target>Melden Sie sich in Ihrem Konto an<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Email<\/source>/<source>Email<\/source>\n        <target>E-Mail<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Password<\/source>/<source>Password<\/source>\n        <target>Passwort<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Forgot your password?<\/source>/<source>Forgot your password?<\/source>\n        <target>Passwort vergessen?<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Don&apos;t have an account? <\/source>/<source>Don&apos;t have an account? <\/source>\n        <target>Noch kein Konto? <\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Sign up<\/source>/<source>Sign up<\/source>\n        <target>Registrieren<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Enter your email<\/source>/<source>Enter your email<\/source>\n        <target>Geben Sie Ihre E-Mail ein<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Enter your password<\/source>/<source>Enter your password<\/source>\n        <target>Geben Sie Ihr Passwort ein<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Sign In<\/source>/<source>Sign In<\/source>\n        <target>Anmelden<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Signing In...<\/source>/<source>Signing In...<\/source>\n        <target>Anmeldung läuft...<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Email is required<\/source>/<source>Email is required<\/source>\n        <target>E-Mail ist erforderlich<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Please enter a valid email<\/source>/<source>Please enter a valid email<\/source>\n        <target>Bitte geben Sie eine gültige E-Mail ein<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Password is required<\/source>/<source>Password is required<\/source>\n        <target>Passwort ist erforderlich<\/target>/g' src/locale/messages.de.xlf
sed -i '' 's/<source>Password must be at least 6 characters<\/source>/<source>Password must be at least 6 characters<\/source>\n        <target>Passwort muss mindestens 6 Zeichen lang sein<\/target>/g' src/locale/messages.de.xlf

echo "German translations added to XLIFF file"
