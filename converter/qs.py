import sys
import json

if len(sys.argv) == 1:
    sys.exit(1)

f = sys.argv[1];

def parse_text(input_str):
    questions = []
    question_blocks = input_str.strip().split('\n\n')

    for block in question_blocks:
        lines = block.split('\n')
        question_type = lines[0].strip()
        current_question = {"type": question_type, "q": [], "answer": ""}

        if question_type == "mult":
            choices = []
            for line in lines[1:]:
                line = line.strip()
                if line.startswith('"') and line.endswith('"'):
                    content = line[1:-1]
                    current_question["q"].append({"type": "p", "content": content})
                elif line.startswith("begin_code"):
                    code_content = []
                    i = lines.index(line) + 1
                    while i < len(lines) and not lines[i].startswith("end_code"):
                        code_content.append(lines[i])
                        i += 1
                    current_question["q"].append({"type": "code", "content": "\n".join(code_content)})
                elif line.startswith('.') or line.startswith('>'):
                    is_answer = line.startswith('>')
                    choice = line[1:].strip()
                    choices.append(choice)
                    if is_answer:
                        current_question["answer"] = choice
            current_question["choices"] = choices

        elif question_type == "fill":
            for line in lines[1:]:
                line = line.strip()
                if line.startswith('"') and line.endswith('"'):
                    content = line[1:-1]
                    current_question["q"].append({"type": "p", "content": content})
                elif line.startswith("begin_code"):
                    code_content = []
                    i = lines.index(line) + 1
                    while i < len(lines) and not lines[i].startswith("end_code"):
                        code_content.append(lines[i])
                        i += 1
                    current_question["q"].append({"type": "code", "content": "\n".join(code_content)})
                elif line.startswith('>'):
                    current_question["answer"] = line[1:].strip()

        questions.append(current_question)
    return questions

# formatted_string = """
# mult
# "This is a multiple choice question"
# begin_code
# const x = 10;
# console.log(x);
# end_code
# . Choice 1
# > Choice 2
# . Choice 3
#
# fill
# "This is a fill in the blank question ____"
# begin_code
# const y = 20;
# console.log(y);
# end_code
# > The answer
# """
#
# out = parse_text(formatted_string)
# print(out)
#

out = ""
with open(f, "r") as ct:
    l = ct.read()
    out = parse_text(l)

with open("output.json", "w") as o:
    o.write(json.dumps(out, indent=4))
