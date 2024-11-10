export function Form() {
  const logFormData = (formData: FormData) => {
    console.log(Object.fromEntries(formData));
    throw  new Error("something bad happened")
  };
  return (
    <div>
      <form action={logFormData} className="space-y-3 grid grid-cols-2 gap-4">
        <div className="flex-col items-start gap-1 flex">
          <label htmlFor="usrname">UserName</label>
          <input
            aria-label="Enter your username"
            type="text"
            defaultValue="username"
            name="username"
            id="usrname"
            className="border-purple-500 border rounded-lg p-2"
          />
        </div>
        <div className="flex-col items-start gap-1 flex">
          <label htmlFor="password">Password</label>
          <input
            aria-label="Enter your password"
            type="password"
            defaultValue="123123"
            name="password"
            id="password"
            className="border-purple-500 border rounded-lg p-2"
          />
        </div>
        <div className="flex-col items-start gap-1 flex">
          <label htmlFor="age">Age</label>
          <input
            aria-label="Enter your age"
            type="number"
            name="age"
            defaultValue="13"
            id="age"
            min={0}
            max={200}
            className="border-purple-500 border rounded-lg p-2"
          />
        </div>
        <label htmlFor="age">File</label>
        <input
          aria-label="Enter your age"
          type="file"
          name="file"
          id="file"
          className="border-purple-500 border rounded-lg p-2"
        />
        <div className="flex-col items-start gap-1 flex">
          <label htmlFor="age">Favorite Color</label>
          <input
            aria-label="Enter your Color"
            defaultValue="#000"
            type="color"
            name="color"
            id="color"
            className="border-purple-500 border rounded-lg p-2"
          />
        </div>
        <div className="flex-col items-start gap-1 flex">
          <label htmlFor="age">Start Date</label>
          <input
            aria-label="Enter your Color"
            type="date"
            name="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            id="date"
            className="border-purple-500 border rounded-lg p-2"
          />
        </div>
        <label htmlFor="signed">
          <input
            aria-label="Enter your Color"
            type="checkbox"
            defaultChecked
            name="signed"
            className="border-purple-500 border rounded-lg p-2"
          />
          Waiver signed
        </label>
        <div className="flex-col items-start gap-1 flex">
          <label htmlFor="role">Role</label>
          <select
            aria-label="Select your role"
            name="role"
            id="role"
            className="border-purple-500 border rounded-lg p-2"
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="wife">Wife</option>
          </select>
        </div>

        <div className="flex-col items-start gap-1 flex">
          <fieldset className="border-purple-500 border rounded-lg p-2">
            <legend>Visibility</legend>
            <div>
              <label htmlFor="public">Public</label>
              <input
                aria-label="Select public visibility"
                type="radio"
                defaultChecked
                name="visibility"
                id="public"
                value="public"
                className="border-purple-500 border rounded-lg p-2"
              />
            </div>
            <div>
              <label htmlFor="private">Private</label>
              <input
                aria-label="Select private visibility"
                type="radio"
                name="visibility"
                id="private"
                value="private"
                className="border-purple-500 border rounded-lg p-2"
              />
            </div>
          </fieldset>
        </div>
        <button type="submit" className="bg-purple-400 px-4 py-2 rounded-lg">
          Submit Username
        </button>
      </form>
    </div>
  );
}
