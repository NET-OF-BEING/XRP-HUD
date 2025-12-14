Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\depan\Pythonscripts\XRP HUD"
WshShell.Run "cmd /c npm start", 0
Set WshShell = Nothing