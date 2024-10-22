# Lines of Code Counter

A Node.js utility that counts lines of code in a directory, with support for excluding dependencies, specific file extensions, and filtering by minimum line length.

## Features

- Recursive directory traversal
- Optional exclusion of `node_modules` directory
- Configurable minimum line length filter
- File extension filtering
- Supports both absolute and relative paths
- Formatted number output

## Installation

1. Clone this repository or copy the `count.js` file to your project
2. Ensure you have Node.js installed (version 10.0.0 or higher recommended)
3. Make the script executable (optional):
   ```bash
   chmod +x count.js
   ```

## Usage

Basic usage:
```bash
node count.js <directory>
```

With options:
```bash
node count.js <directory> [options]
```

### Options

- `-l, --len <number>`: Only count lines longer than specified length
- `-e, --exclude <extensions>`: Comma-separated list of file extensions to exclude
- `-s, --skip`: Skip node_modules directory

### Examples

Count all lines in the current directory:
```bash
node count.js .
```

Count lines with minimum length of 5 characters:
```bash
node count.js . --len 5
```

Exclude JavaScript and TypeScript files:
```bash
node count.js . --exclude js,ts
```

Skip node_modules and count lines longer than 10 characters:
```bash
node count.js . --skip --len 10
```

## Output

The script outputs:
1. A summary of the counting parameters
2. The total number of lines (formatted with thousands separators)

Example output:
```
Counting lines of code longer than 5 in ./src, skipping dependencies, and excluding js, ts files...
12,345
```

## Error Handling

The script will exit with a status code of 1 and display an error message if:
- No directory is specified
- The specified directory doesn't exist
- File reading permissions are insufficient
- Any other filesystem error occurs

## Technical Details

- Uses Node.js built-in `fs.promises` API for asynchronous file operations
- Handles both files and directories recursively
- Filters empty lines and those shorter than the specified minimum length
- Processes text files using UTF-8 encoding

## License

This project is open source and available under the MIT License.


I've created a comprehensive README that covers all aspects of your LOC counter utility. It includes:

1. A clear description of what the tool does
2. Installation instructions
3. Detailed usage examples
4. All available options explained
5. Expected output format
6. Error handling information
7. Technical implementation details

Would you like me to expand on any particular section or add more specific examples?