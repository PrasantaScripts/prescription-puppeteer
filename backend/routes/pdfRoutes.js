const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");
const handlebars = require("handlebars");

const router = express.Router();

router.post("/generate-pdf", async (req, res) => {
  try {
    const data = req.body;

    // Validate input data
    if (!data) {
      return res.status(400).json({ error: "No data provided" });
    }

    const templateData = {
      ...data,
      clinic_name: "Your Clinic Name", // Add these if not in the input data
      clinic_address: "Your Clinic Address",
      doctor_name: "Dr. Name",
      doctor_qualifications: "MD, Specialty",
      date: new Date().toLocaleDateString(),
    };

    // Load Handlebars template
    const templatePath = path.join(__dirname, "../templates/prescription.hbs");
    const templateHtml = await fs.readFile(templatePath, "utf-8");

    // Compile template with Handlebars
    const template = handlebars.compile(templateHtml);
    const finalHtml = template(templateData);

    // Launch Puppeteer with explicit error handling
    const browser = await puppeteer
      .launch({
        headless: "new", // Updated to use new headless mode
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      })
      .catch((err) => {
        throw new Error(`Failed to launch browser: ${err.message}`);
      });

    const page = await browser.newPage();

    try {
      await page.setViewport({
        width: 1240,
        height: 1754,
        deviceScaleFactor: 2,
      });
      await page.emulateMediaType("screen");
      await page.setContent(finalHtml, {
        waitUntil: ["networkidle0", "load", "domcontentloaded"],
      });

      // Generate PDF with explicit error handling
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
        preferCSSPageSize: true,
      });

      if (!pdfBuffer || pdfBuffer.length === 0) {
        throw new Error("PDF generation resulted in empty buffer");
      }

      console.log("PDF Buffer length:", pdfBuffer.length);
      console.log("First 5 bytes:", pdfBuffer.slice(0, 5).toString());

      // Set headers before sending response
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="prescription.pdf"'
      );

      console.log("Response headers:", res.getHeaders());
      console.log("Content type:", res.get("Content-Type"));
      res.write(pdfBuffer);
      res.end();
    } catch (error) {
      throw new Error(`PDF generation failed: ${error.message}`);
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    // Send error response with proper headers
    res.status(500).json({
      error: "Error generating PDF",
      details: error.message,
    });
  }
});

module.exports = router;
