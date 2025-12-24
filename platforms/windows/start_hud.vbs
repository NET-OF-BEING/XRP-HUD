Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
' Navigate from platforms/windows/ up to project root
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
projectDir = fso.GetParentFolderName(fso.GetParentFolderName(scriptDir))
WshShell.CurrentDirectory = projectDir
WshShell.Run "cmd /c npm start", 0
Set WshShell = Nothing
Set fso = Nothing
