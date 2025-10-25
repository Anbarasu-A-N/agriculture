#!/bin/bash
set -e

# ==============================================
# Agriculture Backend Systemd Service Setup
# ==============================================

SERVICE_NAME="agriculture-backend"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"
APP_DIR="/opt/agriculture-backend"
JAR_PATH="${APP_DIR}/target/app.jar"

# Optional JVM settings for performance tuning
JAVA_OPTS="-Xms512m -Xmx1024m"

echo "🔧 Setting up ${SERVICE_NAME} service..."

# Ensure the JAR exists
if [ ! -f "$JAR_PATH" ]; then
  echo "❌ ERROR: JAR file not found at $JAR_PATH"
  exit 1
fi

# Create systemd service unit file
sudo tee "$SERVICE_FILE" > /dev/null <<EOF
[Unit]
Description=Agriculture Backend Spring Boot Service
After=network.target

[Service]
User=ubuntu
WorkingDirectory=${APP_DIR}
ExecStart=/usr/bin/java \$JAVA_OPTS -jar ${JAR_PATH}
SuccessExitStatus=143
Restart=always
RestartSec=10
Environment="JAVA_OPTS=${JAVA_OPTS}"

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd manager configuration
sudo systemctl daemon-reload

# Enable service to start automatically on boot
sudo systemctl enable "${SERVICE_NAME}.service"

# Start the service immediately
sudo systemctl start "${SERVICE_NAME}.service"

# Print service status
if systemctl is-active --quiet "${SERVICE_NAME}.service"; then
  echo "✅ ${SERVICE_NAME} service has been started successfully!"
else
  echo "⚠️  ${SERVICE_NAME} service failed to start. Check logs:"
  echo "   sudo journalctl -u ${SERVICE_NAME} -n 100"
fi

echo ""
echo "🩺 Status command:   sudo systemctl status ${SERVICE_NAME}"
echo "📜 Logs command:     sudo journalctl -u ${SERVICE_NAME} -f"
