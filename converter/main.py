import sys
import json

if len(sys.argv) == 1:
    sys.exit(1)

f = sys.argv[1];
out = [];

def p(lines, start):
    out = ""
    new_start = start
    for i in range(start,len(lines)):
        line = lines[i]
        if line.endswith('"'):
            out += line.replace('"', '')
            new_start = i
            break;
        else:
            out += line
        out += "\n"
    return (out, new_start)

def code(lines, start):
    out = ""
    new_start = start
    for i in range(start + 1,len(lines)):
        if lines[i] == "end_code":
            new_start = i
            break;
        out += lines[i] + "\n"
    return (out, new_start)

def parse_text(text: str):
    global out
    lines = text.split("\n")

    i = 0
    while i < len(lines):
        line = lines[i]
        if line.startswith("#"):
            out.append({
                "type": "h1",
                "content": line[1:].strip()
            })
        elif line.startswith('"'):
            o = p(lines, i)
            out.append({
                "type": "p",
                "content": o[0]
            })
            i = o[1]
        elif "begin_code" in line:
            o = code(lines, i)
            out.append({
                "type": "code",
                "content": o[0]
            })
            i = o[1]
        i+=1

#
# input_text = """
# # Header 1
# "This is a paragraph." begin_code
# def example():
#     print("Hello, world!")
# end_code
# """
#
# parse_text(input_text)
# print(json.dumps(out, indent=2))

with open(f, "r") as ct:
    l = ct.read()
    parse_text(l)

with open("output.json", "w") as o:
    o.write(json.dumps(out, indent=4))
