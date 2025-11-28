export default function Form() {
  return (
    <div>
      <h1>Form</h1>

      <form>
        <label>Name:</label>
        <br />
        <input type="text" placeholder="Enter your name" />
        <br />
        <br />

        <label>Email:</label>
        <br />
        <input type="email" placeholder="Enter your email" />
        <br />
        <br />

        <label>Password:</label>
        <br />
        <input type="password" placeholder="Enter password" />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
