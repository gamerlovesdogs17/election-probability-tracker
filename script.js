document.addEventListener("DOMContentLoaded", async () => {
    const ctx = document.getElementById('probabilityChart').getContext('2d');
    const lastUpdatedElement = document.getElementById('lastUpdated');

    try {
        const response = await fetch('./data/election-data.json');
        const data = await response.json();

        lastUpdatedElement.textContent = data.lastUpdated;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.dates,
                datasets: data.parties.map(party => ({
                    label: party.name,
                    data: party.probabilities,
                    borderColor: party.color,
                    fill: false
                }))
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Election Probabilities Over Time'
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Probability (%)'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Failed to load data:", error);
    }
});
