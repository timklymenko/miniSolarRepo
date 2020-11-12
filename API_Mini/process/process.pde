void setup() {
   
  PrintWriter output = createWriter("data.txt");
  output.println("Hello World");
  output.close(); // Finishes the file
  exit(); // Stops the program
}
