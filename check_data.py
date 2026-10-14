import re

with open(r'i:\pariwisatav2\src\data\pariwisataData.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the entire objekWisata array
ow_match = re.search(r'const objekWisata = \[(.*?)^];', content, re.MULTILINE | re.DOTALL)
if not ow_match:
    # Try without ^ at start of ];
    ow_match = re.search(r'const objekWisata = \[(.*?)\n\];', content, re.DOTALL)

ow_block = ow_match.group(1)

# Now we need to make sure this file is valid JS
# Try to evaluate with node
print('Total length:', len(ow_block))

# Try to parse the data
# Look for syntax issues - quote escaping problems
issues = []
# Check for unescaped quotes inside string values
# Also check for unclosed strings
in_string = False
string_char = None
for i, ch in enumerate(ow_block):
    if in_string:
        if ch == '\\' and i+1 < len(ow_block):
            i += 2
            continue
        if ch == string_char:
            in_string = False
    else:
        if ch in ('"', "'", '`'):
            in_string = True
            string_char = ch

print('Parse OK if no issues above')

# Look for the entire objekWisata array block and check if all 80 entries are separated correctly
# Count '{' at the start of entries
entry_starts = [m.start() for m in re.finditer(r'^\s*\{\s*$', ow_block, re.MULTILINE)]
print(f'Entry starts (lines starting with {{): {len(entry_starts)}')
