# Expo Go QR Code Troubleshooting

If the QR code for Expo Go is not working, try these steps:

## Quick Fixes

1. **Clear Expo cache:**
   ```bash
   npx expo start --clear
   ```

2. **Check network connection:**
   - Make sure your phone and computer are on the same WiFi network
   - Try using tunnel mode: `npx expo start --tunnel`

3. **Update Expo Go app:**
   - Make sure you have the latest version of Expo Go installed on your phone
   - Update from App Store (iOS) or Google Play (Android)

4. **Try different connection methods:**
   ```bash
   # Tunnel mode (works across networks)
   npx expo start --tunnel
   
   # LAN mode (same network)
   npx expo start --lan
   
   # Localhost mode
   npx expo start --localhost
   ```

5. **Check firewall/antivirus:**
   - Make sure your firewall isn't blocking Expo
   - Port 8081 should be open

6. **Restart Expo:**
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart
   npm run start
   ```

## Manual Connection

If QR code still doesn't work:
1. Look for the connection URL in the terminal (e.g., `exp://192.168.1.100:8081`)
2. Open Expo Go app
3. Tap "Enter URL manually"
4. Paste the connection URL

