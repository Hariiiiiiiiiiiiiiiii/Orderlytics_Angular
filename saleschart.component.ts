import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saleschart',
  templateUrl: './saleschart.component.html',
  styleUrls: ['./saleschart.component.css']
})

export class SaleschartComponent implements OnInit {

    data: any;
    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        // Connect python script to database using SQLAlchemy
        // Use pandas to perform data operations
        // Create an API that can be used to get the data

        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
            datasets: [
                {
                    label: 'Revenue in Rupees ₹',
                    data: [34345, 45678, 28456, 56789, 34567, 67890, 58012, 78568],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--teal-600'),
                    tension: 0.4
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.9,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}