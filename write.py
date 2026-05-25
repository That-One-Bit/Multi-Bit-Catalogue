from bjson import BJSONFile
import json

filename = input('Enter the name of the file (Without extension): ')
ext = input('Enter the file extension (json, bjson): ')

if ext == "bjson":
	bjson_file = BJSONFile().open(f"./{filename}.bjson")
	json_str = bjson_file.toJson(showDebug=True)

	with open(f"{filename}_c.json", "w", encoding="utf-8") as f:
 	   f.write(json_str)

elif ext == "json":
	with open(f"{filename}.{ext}", "r") as f:
	    bjson_file = BJSONFile()
	    bjson_file.fromJson(f.read())

	with open(f"./{filename}_c.bjson", "wb") as f:
	    f.write(bjson_file.getData())
else:
	print("Please enter a valid extension (json, bjson).")