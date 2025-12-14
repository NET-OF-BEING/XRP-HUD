# XRP Price HUD

Desktop overlay widget displaying live XRP cryptocurrency prices from BTC Markets.

## Features

- **Live Price Tracking** - Real-time XRP/AUD prices from BTC Markets API
- **Historical Comparison** - Shows price changes over 1h, 12h, and 24h periods
- **Always-on-Top Display** - Stays visible over other windows
- **Beautiful UI** - Violet/pink gradient design with transparency
- **Frameless Window** - Clean, modern overlay interface
- **Auto-Refresh** - Updates every 60 seconds
- **Cross-Platform** - Works on both Linux and Windows
- **Manual Refresh** - Click refresh button for instant updates
- **Trend Indicators** - Visual up/down arrows with percentage changes

## Screenshots

The HUD displays:
- Current XRP price in large, gradient text
- Historical prices with trend indicators
- Color-coded changes (green for gains, red for losses)
- Last update timestamp

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Usage

### Linux

Run the launcher script:

```bash
./start_hud.sh
```

Or manually:

```bash
npm start
```

### Windows

Double-click `start_hud.vbs` to launch the HUD without a console window.

Or manually:

```cmd
npm start
```

## Files

- `BTCMarkets_XRP_HUD.py` - Main React component with price fetching logic
- `index.html` - Main HTML file for the Electron window
- `main.js` - Electron main process configuration
- `package.json` - Node.js dependencies and scripts
- `start_hud.sh` - Linux launcher script
- `start_hud.vbs` - Windows launcher script (no console)

## Configuration

### Window Properties

The HUD window is configured in `main.js`:
- Width: 400px
- Height: 900px
- Transparent: Yes
- Always on top: Yes (toggle via right-click menu)
- Frameless: Yes
- Resizable: Yes (minimum 300x400)

### API Updates

The app fetches data from:
- BTC Markets Ticker API: `https://api.btcmarkets.net/v3/markets/XRP-AUD/ticker`
- BTC Markets Candles API: `https://api.btcmarkets.net/v3/markets/XRP-AUD/candles`

Update interval: 60 seconds (configurable in `BTCMarkets_XRP_HUD.py` line 14)

## Right-Click Menu

- **Stay on Top** - Toggle always-on-top behavior

## Technical Details

### Built With

- **Electron** - Desktop application framework
- **React** - UI component library (JSX in the .py file)
- **Lucide React** - Icon library for trend indicators
- **BTC Markets API** - Cryptocurrency price data

### Price Calculation

- **Current Price**: Latest ticker price from API
- **1 Hour Ago**: Close price from candle 1 hour back
- **12 Hours Ago**: Close price from candle 12 hours back
- **24 Hours Ago**: Close price from first candle in 24h window

## Troubleshooting

### App won't start
- Ensure Node.js and npm are installed
- Run `npm install` to install dependencies
- Check that port 3000 isn't already in use

### Prices not updating
- Check internet connection
- Verify BTC Markets API is accessible
- Check browser console for errors (Ctrl+Shift+I in dev mode)

### Window positioning issues
- Right-click to access "Stay on Top" toggle
- Resize and reposition as needed

## Development

To run in development mode with dev tools:

```bash
npm start
```

Then press `Ctrl+Shift+I` to open developer tools.

## License

This project is open source and available for personal use.

## Data Source

Price data provided by [BTC Markets](https://www.btcmarkets.net/) - Australia's leading cryptocurrency exchange.

## Disclaimer

This software is for informational purposes only. Cryptocurrency investments carry risk. Always do your own research before making investment decisions.
