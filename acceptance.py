from selenium import webdriver
from selenium.webdriver.common.by import By
import unittest

class ToDoListTests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()  # Ensure ChromeDriver is in your PATH
        self.driver.get("http://127.0.0.1:5500/home.html")  # Adjust the path to your HTML file

    def tearDown(self):
        self.driver.quit()

    def test_add_task(self):
        driver = self.driver

        input_box = driver.find_element(By.ID, "input-box")
        add_button = driver.find_element(By.ID, "add-button")

        input_box.send_keys("Buy groceries")
        add_button.click()
        save_button = driver.find_element(By.ID, "save-button")
        save_button.click()

        tasks = driver.find_elements(By.CSS_SELECTOR, "#list-container li")
        self.assertEqual(len(tasks), 1)
        deleteText = "\n×"
        self.assertEqual(tasks[0].text, "Buy groceries" + deleteText)

    def test_remove_task(self):
        driver = self.driver
        input_box = driver.find_element(By.ID, "input-box")
        add_button = driver.find_element(By.ID, "add-button")

        input_box.send_keys("Buy groceries")
        add_button.click()

        save_button = driver.find_element(By.ID, "save-button")
        save_button.click()

        tasks = driver.find_elements(By.CSS_SELECTOR, "#list-container li")
        self.assertEqual(len(tasks), 1)

        delete_button = tasks[0].find_element(By.TAG_NAME, "deleteButton")
        delete_button.click()

        tasks = driver.find_elements(By.CSS_SELECTOR, "#list-container li")
        self.assertEqual(len(tasks), 0)

if __name__ == "__main__":
    unittest.main()