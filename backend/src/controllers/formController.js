import { prisma } from '../server.js';

// Get form data
export const getFormData = async (req, res) => {
  try {
    const form = await prisma.form.findFirst({
      include: {
        personalInfo: true,
        educationalStatus: true,
        projects: true,
      },
    });
    
    if (!form) {
      return res.status(200).json({
        personalInfo: {
          name: '',
          email: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          zipcode: '',
        },
        educationalStatus: {
          isStudying: false,
          studyingAt: '',
        },
        projects: [],
      });
    }
    
    return res.status(200).json({
      personalInfo: form.personalInfo,
      educationalStatus: form.educationalStatus,
      projects: form.projects,
    });
  } catch (error) {
    console.error('Error fetching form data:', error);
    return res.status(500).json({ error: 'Failed to fetch form data' });
  }
};

// Save personal information
export const savePersonalInfo = async (req, res) => {
  try {
    const personalInfo = req.body;

    // Find or create a form
    let form = await prisma.form.findFirst();
    
    if (!form) {
      form = await prisma.form.create({
        data: {
          status: 'in-progress',
        },
      });
    }

    // Update personal info
    await prisma.personalInfo.upsert({
      where: { formId: form.id },
      update: personalInfo,
      create: {
        ...personalInfo,
        form: { connect: { id: form.id } },
      },
    });

    return res.status(200).json({ message: 'Personal information saved' });
  } catch (error) {
    console.error('Error saving personal info:', error);
    return res.status(500).json({ error: 'Failed to save personal information' });
  }
};

// Save educational status
export const saveEducationalStatus = async (req, res) => {
  try {
    const educationalStatus = req.body;

    // Find or create a form
    let form = await prisma.form.findFirst();
    
    if (!form) {
      form = await prisma.form.create({
        data: {
          status: 'in-progress',
        },
      });
    }

    // Update educational status
    await prisma.educationalStatus.upsert({
      where: { formId: form.id },
      update: educationalStatus,
      create: {
        ...educationalStatus,
        form: { connect: { id: form.id } },
      },
    });

    return res.status(200).json({ message: 'Educational status saved' });
  } catch (error) {
    console.error('Error saving educational status:', error);
    return res.status(500).json({ error: 'Failed to save educational status' });
  }
};

// Save projects
export const saveProjects = async (req, res) => {
  try {
    const projects = req.body;

    // Find or create a form
    let form = await prisma.form.findFirst();
    
    if (!form) {
      form = await prisma.form.create({
        data: {
          status: 'in-progress',
        },
      });
    }

    // Delete existing projects and create new ones
    await prisma.$transaction([
      prisma.project.deleteMany({
        where: { formId: form.id },
      }),
      ...projects.map(project => 
        prisma.project.create({
          data: {
            name: project.name,
            description: project.description,
            form: { connect: { id: form.id } },
          },
        })
      ),
    ]);

    return res.status(200).json({ message: 'Projects saved' });
  } catch (error) {
    console.error('Error saving projects:', error);
    return res.status(500).json({ error: 'Failed to save projects' });
  }
};

// Complete form submission
export const completeForm = async (req, res) => {
  try {
    // Find or create a form
    let form = await prisma.form.findFirst();
    
    if (!form) {
      form = await prisma.form.create({
        data: {
          status: 'in-progress',
        },
      });
    }

    // Update form status
    await prisma.form.update({
      where: { id: form.id },
      data: {
        status: 'completed',
        completedAt: new Date(),
      },
    });

    return res.status(200).json({ message: 'Form completed successfully' });
  } catch (error) {
    console.error('Error completing form:', error);
    return res.status(500).json({ error: 'Failed to complete form' });
  }
};